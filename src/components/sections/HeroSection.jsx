"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cn } from "@/lib/utils";
import {
  updateSection,
  setSelectedSection,
} from "../../../features/portfolio/portfolioSlice";

const EditableText = ({
  value,
  onChange,
  isSelected,
  sectionId,
  className,
}) => {
  const dispatch = useDispatch();
  const isEditing = true;

  if (!isEditing) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span
      contentEditable
      suppressContentEditableWarning
      className={cn(
        className,
        "px-1 cursor-text",
        isSelected
          ? "outline outline-2 outline-primary rounded-sm"
          : "outline-none"
      )}
      onClick={(e) => {
        e.stopPropagation();
        dispatch(setSelectedSection({ _id: sectionId, type: "hero" }));
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          e.currentTarget.blur();
        }
      }}
      onBlur={(e) => onChange(e.target.innerText)}
    >
      {value}
    </span>
  );
};

const EditableParagraph = ({
  value,
  onChange,
  isSelected,
  sectionId,
  className,
}) => {
  const dispatch = useDispatch();
  const isEditing = true;

  if (!isEditing) {
    return <p className={className}>{value}</p>;
  }

  return (
    <p
      contentEditable
      suppressContentEditableWarning
      className={cn(
        className,
        "px-1 cursor-text whitespace-pre-wrap",
        isSelected
          ? "outline outline-2 outline-primary rounded-sm"
          : "outline-none"
      )}
      onClick={(e) => {
        e.stopPropagation();
        dispatch(setSelectedSection({ _id: sectionId, type: "hero" }));
      }}
      onBlur={(e) => onChange(e.target.innerText)}
    >
      {value}
    </p>
  );
};

export default function HeroSection({ id, content }) {
  const dispatch = useDispatch();
  const selectedSection = useSelector(
    (state) => state.portfolio.selectedSection
  );

  const [isSelected, setSelected] = useState(false);

  useEffect(() => {
    if (!selectedSection) return;
    setSelected(selectedSection._id === id);
  }, [selectedSection, id]);

  return (
    <section
      className="h-[calc(80vh-40px)] relative flex items-center justify-center bg-background px-6"
      onClick={() =>
        dispatch(setSelectedSection({ _id: id, type: "hero" }))
      }
    >
      <div className="max-w-3xl text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground">
          <EditableText
            value={content.primaryHeading}
            sectionId={id}
            isSelected={isSelected}
            onChange={(val) =>
              dispatch(
                updateSection({
                  _id: id,
                  content: { primaryHeading: val },
                })
              )
            }
          />
        </h1>

        <EditableParagraph
          value={content.secondaryHeading}
          sectionId={id}
          isSelected={isSelected}
          className="text-muted-foreground text-lg md:text-xl"
          onChange={(val) =>
            dispatch(
              updateSection({
                _id: id,
                content: { secondaryHeading: val },
              })
            )
          }
        />
      </div>
    </section>
  );
}
