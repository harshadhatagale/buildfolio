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
      onBlur={(e) => onChange(e.currentTarget.innerText)}
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
      onBlur={(e) => onChange(e.currentTarget.innerText)}
    >
      {value}
    </p>
  );
};

export default function AboutSection({ id, content }) {
  const dispatch = useDispatch();
  const device = useSelector((state) => state.portfolio.device);
  const selectedSection = useSelector(
    (state) => state.portfolio.selectedSection
  );

  const [isSelected, setSelected] = useState(false);

  useEffect(() => {
    setSelected(selectedSection?._id === id);
  }, [selectedSection, id]);

  const layout =
    device === "desktop"
      ? "grid grid-cols-2 gap-12"
      : "flex flex-col gap-8";

  const imageHeight =
    device === "mobile"
      ? "h-64"
      : device === "tablet"
      ? "h-80"
      : "h-96";

  const headingSize =
    device === "mobile"
      ? "text-2xl"
      : device === "tablet"
      ? "text-3xl"
      : "text-4xl";

  const textSize =
    device === "mobile"
      ? "text-base"
      : device === "tablet"
      ? "text-lg"
      : "text-lg";

  return (
    <section
      className="relative py-16 px-6 bg-background"
      onClick={() =>
        dispatch(setSelectedSection({ _id: id, type: "about" }))
      }
    >
      <div
        className={cn(
          "max-w-5xl mx-auto items-center",
          layout
        )}
      >
        <div
          className={cn(
            "relative w-full rounded-xl overflow-hidden shadow-lg",
            imageHeight
          )}
        >
          <img
            src={content.avatar}
            alt="avatar"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="space-y-4">
          <h2 className={cn("font-bold text-foreground", headingSize)}>
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
            className={cn("text-muted-foreground", textSize)}
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
