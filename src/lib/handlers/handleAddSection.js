// hooks/useAddSection.js
import { useDispatch, useSelector } from "react-redux";
import { addSection } from "../../../features/portfolio/portfolioSlice";
import { GetDefaultContent } from "../getDefaultContent";

export const useAddSection = () => {
  const dispatch = useDispatch();
  const sections = useSelector((state) => state.portfolio.sections);

  const handleAddSection = async ({ projectId, type }) => {
    const content= GetDefaultContent(type)
    try {
      const res = await fetch(`/api/project/${projectId}/sections/`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type, content }),
      });

      const result = await res.json();
      dispatch(addSection(result.section)); // you can use result.section instead, based on your API response
    } catch (error) {
      console.error("Error adding section:", error);
    }
  };

  return { handleAddSection };
};
