import * as React from "react";
import MainScreenContainer from "../../components/MainScreenContainer";
import TextTitle from "../../components/TextTitle";

export interface AppQuickNotesProps {}

const AppQuickNotes: React.FunctionComponent<AppQuickNotesProps> = () => {
  return (
    <MainScreenContainer>
      <TextTitle text="Add a quick Timer Note!" />
    </MainScreenContainer>
  );
};

export default AppQuickNotes;
