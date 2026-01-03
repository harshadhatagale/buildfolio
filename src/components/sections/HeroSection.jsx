"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cn } from "@/lib/utils";
import {
  updateSection,
  setSelectedSection,
} from "../../../features/portfolio/portfolioSlice";
import { Button } from "../ui/button";
import { ArrowRight, Download } from "lucide-react";

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
        dispatch(setSelectedSection({ _id: sectionId, type: "hero" }));
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
        dispatch(setSelectedSection({ _id: sectionId, type: "hero" }));
      }}
      onBlur={(e) => onChange(e.currentTarget.innerText)}
    >
      {value}
    </p>
  );
};

export default function HeroSection({ id, content }) {
  const dispatch = useDispatch();
  const device = useSelector((state) => state.portfolio.device);
  const selectedSection = useSelector(
    (state) => state.portfolio.selectedSection
  );

  const [isSelected, setSelected] = useState(false);

  useEffect(() => {
    setSelected(selectedSection?._id === id);
  }, [selectedSection, id]);

  const headingSize =
    device === "mobile"
      ? "text-3xl"
      : device === "tablet"
      ? "text-5xl"
      : "text-6xl";

  const paraSize =
    device === "mobile"
      ? "text-base"
      : device === "tablet"
      ? "text-lg"
      : "text-xl";

  const buttonLayout =
    device === "mobile" ? "flex-col w-full" : "flex-row";

  return (
    <section
      className="relative h-full flex flex-col gap-6 items-center justify-center bg-background px-6 py-20"
      onClick={() =>
        dispatch(setSelectedSection({ _id: id, type: "hero" }))
      }
    >
      <div
        className={cn(
          "text-center space-y-6",
          device === "mobile" ? "max-w-full" : "max-w-3xl"
        )}
      >
        <h1 className={cn("font-bold text-foreground", headingSize)}>
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
          className={cn("text-muted-foreground", paraSize)}
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

      <div
        className={cn(
          "flex gap-3 items-center justify-center",
          buttonLayout
        )}
      >
        <Button
          size="lg"
          className={cn(
            "capitalize flex items-center gap-2",
            device === "mobile" && "w-full"
          )}
        >
          <span>Get in touch</span>
          <ArrowRight size={18} />
        </Button>

        <Button
          size="lg"
          variant="outline"
          className={cn(
            "capitalize flex items-center gap-2",
            device === "mobile" && "w-full"
          )}
        >
          <Download size={18} />
          <span>Download My Resume</span>
        </Button>
      </div>
    </section>
  );
}
