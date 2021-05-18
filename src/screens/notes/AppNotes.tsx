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
  //   const arr = await getCategories(store.appState.auth?.uid as string);
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
      <TextTitle text={`Proyecto ${projectName}`} />
      <View>
        <Button
          title="Add new note"
          style={{ fontSize: 30 }}
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
        <TextTitle text="Your project notes" style={{ marginVertical: 30 }} />
        {stickyDefaultNote.length === 0 ? (
          <TextP text="Empty notes for this project" />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={{
              borderTopWidth: 2,
              borderColor: theme.colors.alternative,
              paddingHorizontal: 10,
            }}
          >
            {stickyDefaultNote.map((note) => (
              <TouchableOpacity
                key={note.id}
                style={{
                  backgroundColor: "white",
                  paddingHorizontal: 10,
                  paddingVertical: 30,
                  borderRadius: 30,
                  alignItems: "center",
                  marginVertical: 30,
                  width: "100%",
                }}
                onLongPress={() => handleDelete(note.id)}
              >
                <TextP
                  text={note.title}
                  style={{ color: "black", fontWeight: "bold", fontSize: 25 }}
                />
                <TextP
                  style={{ marginVertical: 20, color: "black" }}
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
                      fontSize: 20,
                    }}
                    text={note.done ? "Completed" : "Pending"}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
    </MainScreenContainer>
  );
};

export default AppNotes;
