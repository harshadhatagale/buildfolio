// hooks/useAddSection.js
import { useDispatch, useSelector } from "react-redux";
import { addSection, setSelectedSection } from "../../../features/portfolio/portfolioSlice";
import { GetDefaultContent } from "../getDefaultContent";

export const useAddSection = () => {
  const dispatch = useDispatch();
  const sections = useSelector((state) => state.portfolio.present);

  const handleAddSection = async ({ type }) => {
    const content= GetDefaultContent(type)
    const section= {
      _id: "temp-"+ Date.now(),
      name:"Untitled section",
      type:type,
      content:content,
      order: sections.length>0 ? sections.length : 0
    }
    try {
      dispatch(addSection(section));
      dispatch(setSelectedSection(section));
    } catch (error) {
      console.error("Error adding section:", error);
    }
  };

  return { handleAddSection };
};
