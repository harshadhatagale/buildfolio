"use client";

import { useEffect, useState } from "react";
import { AlignRight, Plus, X } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import {
  updateSection,
  setSelectedSection,
} from "../../../features/portfolio/portfolioSlice";
import { ModeToggle } from "../basics/ModeToggle";

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
        dispatch(setSelectedSection({ _id: sectionId, type: "nav" }));
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

export default function Nav({ id, content }) {
  const dispatch = useDispatch();
  const device = useSelector((state) => state.portfolio.device);
  const selectedSection = useSelector(
    (state) => state.portfolio.selectedSection
  );

  const [isSelected, setIsSelected] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setIsSelected(selectedSection?._id === id);
  }, [selectedSection, id]);

  const addLink = () => {
    dispatch(
      updateSection({
        _id: id,
        content: {
          links: [...content.links, { title: "New Link", link: "#" }],
        },
      })
    );
  };

  const updateLinkTitle = (index, value) => {
    const updatedLinks = [...content.links];
    updatedLinks[index] = { ...updatedLinks[index], title: value };
    dispatch(updateSection({ _id: id, content: { links: updatedLinks } }));
  };

  return (
    <header
      className="w-[92%] backdrop-blur-xl backdrop-saturate-200 mx-auto my-5 max-w-7xl rounded-2xl px-3 border bg-background"
      onClick={() =>
        dispatch(setSelectedSection({ _id: id, type: "nav" }))
      }
    >
      <div className="flex h-16 items-center justify-between">
        <span className="text-lg font-semibold">
          <EditableText
            value={content.portfolioName}
            sectionId={id}
            isSelected={isSelected}
            onChange={(val) =>
              dispatch(
                updateSection({
                  _id: id,
                  content: { portfolioName: val },
                })
              )
            }
          />
        </span>

        {device !== "mobile" && (
          <nav className="flex items-center gap-4">
            {content.links.map((link, i) => (
              <EditableText
                key={i}
                value={link.title}
                sectionId={id}
                isSelected={isSelected}
                className="text-sm font-medium"
                onChange={(val) => updateLinkTitle(i, val)}
              />
            ))}
            {isSelected && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addLink();
                }}
                className="flex items-center gap-1 px-2 py-1 text-xs border border-dashed rounded-md"
              >
                <Plus className="h-3 w-3" />
                Add link
              </button>
            )}
            <ModeToggle />
          </nav>
        )}

        {device === "mobile" && (
          <Button
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
            }}
          >
            <AlignRight />
          </Button>
        )}
      </div>
    </header>
  );
}
