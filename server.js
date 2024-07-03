import { Configuration, OpenAIApi } from "openai";
import { createClient } from '@supabase/supabase-js';


const supabaseUrl = 'https://oumshxpusclfympuhbzi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91bXNoeHB1c2NsZnltcHVoYnppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU5NDk3MTksImV4cCI6MjAyMTUyNTcxOX0.ZrmLGyR1AYMfEdEq-F75C3B23gGwpfGIN8NeC_JKsJE';

export const supabase = createClient(supabaseUrl, supabaseKey);

async function generateEmbeddings() {
    // Initialize OpenAI API
    const configuration = new Configuration({ apiKey: "sk-proj-Id5bU95H39mkTxVgf8b4T3BlbkFJzEs4BnQw3yl1ypMQjsh5" });
    const openai = new OpenAIApi(configuration);
    // Create some custom data (Cooper Codes)
    const documents = [
        "ثمالة الذكريات يروي قصص عن حنين",
        "فيه قصص خيالية وحقيقية",
        "يتحدث عن خيال قصصي"
    ];

    for(const document of documents) {
        const input = document.replace(/\n/g, '');

        // Turn each string (custom data) into an embedding
        const embeddingResponse = await openai.createEmbedding({
            model: "text-embedding-ada-002", // Model that creates our embeddings
            input
        });

        const [{ embedding }] = embeddingResponse.data.data;

        // Store the embedding and the text in our supabase DB
        
             await supabase
            .from('Books')
            .update({ embedding: embedding })
            .eq('id', 'ed1cded4-07cf-4c59-98fc-35a2e29a5e80')
            .select()
        
    }
}

// async function askQuestion() {
//     const { data, error } = await supabaseClient.functions.invoke('ask-custom-data', {
//         body: JSON.stringify({ query: "What is Cooper Codes favorite food?" }),
//       })
//     console.log(data);
//     console.log(error);
// }

// askQuestion();

generateEmbeddings()

// /ask-custom-data -> getting relevant documents, asking chatgpt, returning the response
// Supabase command line interface