import { GetDefaultContent } from "../getDefaultContent"
import { v4 as uuidv4 } from "uuid"

export const normalizeSection = ({
  section,
  order,
  existingSections,
}) => {
  if (!section?.type) {
    throw new Error("Section missing 'type'")
  }

  const defaultContent = GetDefaultContent(section.type)

  // 🔥 merge default schema + imported data
  const mergedContent = {
    ...defaultContent,
    ...section,
  }

  const untitledCount = existingSections.filter((s) =>
    s.name?.startsWith("Untitled")
  ).length

  return {
    _id: `temp-${uuidv4()}`,
    name: `Untitled section ${untitledCount + 1}`,
    type: section.type,
    content: mergedContent,
    order,
  }
}
