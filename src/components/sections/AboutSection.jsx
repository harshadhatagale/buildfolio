"use client";

import React, { useEffect, useState } from "react";
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
        dispatch(setSelectedSection({ _id: sectionId, type: "about" }));
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
        dispatch(setSelectedSection({ _id: sectionId, type: "about" }));
      }}
      onBlur={(e) => onChange(e.target.innerText)}
    >
      {value}
    </p>
  );
};

export default function AboutSection({ id, content }) {
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
      className="relative py-10 px-5 bg-background"
      onClick={() =>
        dispatch(setSelectedSection({ _id: id, type: "about" }))
      }
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="relative w-full flex justify-center items-center h-72 md:h-96 rounded-xl bg-transparent overflow-hidden shadow-lg">
          <img
            src={content.avatar}
            alt="avatar"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            <EditableText
              value={content.heading}
              sectionId={id}
              isSelected={isSelected}
              onChange={(val) =>
                dispatch(
                  updateSection({
                    _id: id,
                    content: { heading: val },
                  })
                )
              }
            />
          </h2>

          <EditableParagraph
            value={content.about}
            sectionId={id}
            isSelected={isSelected}
            className="text-muted-foreground text-base md:text-lg"
            onChange={(val) =>
              dispatch(
                updateSection({
                  _id: id,
                  content: { about: val },
                })
              )
            }
          />
        </div>
      </div>
    </section>
  );
}
