import * as React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import Button from "../../components/Button";
import CategoryLooker from "../../components/CategoryLooker";
import MainScreenContainer from "../../components/MainScreenContainer";
import TextP from "../../components/TextP";
import TextTitle from "../../components/TextTitle";
import { getNotes, deleteNote, updateNote } from "../../db/notes";
import { StoreContext } from "../../state/Store";
import { StickyDefaulNoteType } from "../../../types";

export interface AppNotesProps {
  route: any;
  navigation: any;
}

const AppNotes: React.FunctionComponent<AppNotesProps> = ({
  route,
  navigation,
}) => {
  const { projectName, projectId } = route.params;
  const { dispatch, store } = React.useContext(StoreContext);
  const {
    appData: { stickyDefaultNote },
    appState: { theme },
  } = store;

  React.useEffect(() => {
    // fetch and fill the state for this component
    if (stickyDefaultNote.length === 0) {
      fetchNotes();
      setTimeout(() => {
        dispatch({ type: "SET_LOADING", payload: { loading: false } });
      }, 2000);
    }

    return () => {
      dispatch({ type: "SET_NOTES", payload: [] });
    };
  }, []);

  const fetchNotes = async () => {
    const arr = await getNotes(projectId);
    console.log(arr);
    dispatch({ type: "SET_NOTES", payload: arr });
  };

  // const fetchCategories = async () => {
  // const arr = await getCategories(store.appState.auth?.uid as string);
  //   dispatch({ type: "REPLACE_CATEGORIES", payload: arr });
  // };

  const handleDelete = async (idNote: string) => {
    await deleteNote(projectId, idNote);
    const arrFilte = stickyDefaultNote.filter((note) => note.id !== idNote);
    dispatch({ type: "SET_NOTES", payload: arrFilte });
  };

  const handleUpdateDone = async (note: StickyDefaulNoteType) => {
    let newNote = note;
    newNote.done = !note.done;

    // filter arrary
    let arrayFilter = stickyDefaultNote.filter(
      (itemNote) => itemNote.id !== newNote.id
    );

    arrayFilter.push(newNote);
    dispatch({ type: "SET_NOTES", payload: arrayFilter });
    await updateNote(projectId, newNote, note.id);
  };

  return (
    <MainScreenContainer>
      <TextTitle style={{ fontSize: 20 }} text={`Proyecto ${projectName}`} />
      <View>
        <Button
          title="Add new note"
          style={{ fontSize: 15 }}
          onPress={() =>
            navigation.navigate("Add Note", {
              projectId,
              projectName,
              mod: false,
              navigation,
            })
          }
        />
      </View>
      <View>
        {stickyDefaultNote.length === 0 ? (
          <TextP text="Empty notes for this project" />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            // alwaysBounceVertical={true}
            style={{
              borderTopWidth: 2,
              borderColor: theme.colors.alternative,
              paddingHorizontal: 20,
              paddingVertical: -60,
              width: "100%",
            }}
          >
            {stickyDefaultNote.map((note) => (
              <TouchableOpacity
                key={note.id}
                style={{
                  backgroundColor: "white",
                  paddingHorizontal: 10,
                  borderRadius: 30,
                  alignItems: "center",
                  marginVertical: 10,
                  paddingVertical: 30,
                }}
                onLongPress={() => handleDelete(note.id)}
              >
                <TextP
                  text={note.title}
                  style={{ color: "black", fontWeight: "bold", fontSize: 20 }}
                />
                <TextP
                  style={{ marginVertical: 10, color: "black" }}
                  text={note.body}
                />
                <CategoryLooker categoryId={note.categoryId} />
                <TouchableOpacity onPress={() => handleUpdateDone(note)}>
                  <TextP
                    style={{
                      width: "60%",
                      paddingVertical: 15,
                      paddingHorizontal: 30,
                      borderRadius: 30,
                      marginVertical: 20,
                      backgroundColor: !note.done ? "red" : "green",
                      textDecorationLine: note.done ? "line-through" : "none",
                      color: "white",
                      fontSize: 15,
                    }}
                    text={note.done ? "Completed" : "Pending"}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
            <View style={{ height: "30%" }}></View>
          </ScrollView>
        )}
      </View>
    </MainScreenContainer>
  );
};

export default AppNotes;
