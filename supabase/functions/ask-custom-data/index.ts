// @ts-nocheck
import 'https://deno.land/x/xhr@0.2.1/mod.ts'
import GPT3Tokenizer from 'https://esm.sh/gpt3-tokenizer@1.1.5'

import { stripIndent, oneLine } from 'https://esm.sh/common-tags@1.8.2'




export async function askQuestion(supabase: supabase, openai: OpenAI) {

  // Search query is passed in request payload
  const { query } = await req.json()

  // OpenAI recommends replacing newlines with spaces for best results
  const input = query.replace(/\n/g, ' ')
  console.log(input);

 

  // Generate a one-time embedding for the query itself
  const embeddingResponse = await openai.createEmbedding({
    model: 'text-embedding-ada-002',
    input,
    encoding_format: "float",
  })

  const [{ embedding }] = embeddingResponse.data[0].embedding;

  // get the relevant documents to our question by using the match_documents
  // rpc: call PostgreSQL functions in supabase
  const { data: documents, error } = await supabase.rpc('match_documents', {
    query_embedding: embedding,
    match_threshold: .73, // Choose an appropriate threshold for your data
    match_count: 10, // Choose the number of matches
  })
  
  if (error){

    console.log("err:", error)
  } 
  // documents is going to be all the relevant data to our specific question.

  const tokenizer = new GPT3Tokenizer({ type: 'gpt3' })
  let tokenCount = 0
  let contextText = ''

  // Concat matched documents
  for (let i = 0; i < documents.length; i++) {
    const document = documents[i]
    const content = document.content
    const encoded = tokenizer.encode(content)
    tokenCount += encoded.text.length

    // Limit context to max 1500 tokens (configurable)
    if (tokenCount > 1500) {
      break
    }

    contextText += `${content.trim()}---\n`
  }

  const prompt = stripIndent`${oneLine`
  You are responsible for a library, respond creatively and embody the personality of the writer"`}
    Context sections:
    ${contextText}
    Question: """
    ${query}
    """
    Answer as crative text:
  `

  // get response from text-davinci-003 model
  const completionResponse = await openai.completions.create({
    model: 'davinci-002',
    prompt,
    max_tokens: 512, // Choose the max allowed tokens in completion
    temperature: 0, // Set to 0 for deterministic results
  })
  console.log(completionResponse);

 

  const { id, choices } = completionResponse.data;
const [{ text }] = choices;

  // return the response from the model to our use through a Response
  return { text , id };
};


