import { Button, Dialog, Portal, Text } from "react-native-paper";


 export const ConfirmDeletion = ({}) =>{
    const [visible, setVisible] = React.useState(false);

    return(
       < Portal>
      <Dialog visible={true} >
        <Dialog.Icon icon="alert" />
        <Dialog.Title style={styles.title}>This is a title</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">This is simple dialog</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => console.log('Cancel')}>Cancel</Button>
          <Button onPress={() => console.log('Ok')}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
    );

    
  };