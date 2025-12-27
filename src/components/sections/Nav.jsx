"use client";

import { useEffect, useState } from "react";
import { AlignRight, Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
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
  const isEditing = true;

  if (!isEditing) return <span className={className}>{value}</span>;

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
      onBlur={(e) => onChange(e.target.innerText)}
    >
      {value}
    </span>
  );
};

const Nav = ({ id, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const selectedSection = useSelector(
    (state) => state.portfolio.selectedSection
  );

  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (!selectedSection) return;
    setIsSelected(selectedSection._id === id);
  }, [selectedSection, id]);
  const deleteLink = (index) => {
  const updatedLinks = content.links.filter((_, i) => i !== index);

  dispatch(
    updateSection({
      _id: id,
      content: { links: updatedLinks },
    })
  );
};
  const addLink = () => {
    const updatedLinks = [
      ...content.links,
      { title: "New Link", link: "#" },
    ];

    dispatch(
      updateSection({
        _id: id,
        content: { links: updatedLinks },
      })
    );
  };

  return (
    <header
      className="px-3 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      onClick={() =>
        dispatch(setSelectedSection({ _id: id, type: "nav" }))
      }
    >
      <div className="flex h-16 items-center justify-between w-full">
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

        <nav className="hidden md:flex items-center space-x-4">
          {content.links.map((link, index) => (
            <span
              key={index}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              <EditableText
                value={link.title}
                sectionId={id}
                isSelected={isSelected}
                onChange={(val) => {
                  const updatedLinks = [...content.links];
                  updatedLinks[index] = {
                    ...updatedLinks[index],
                    title: val,
                  };

                  dispatch(
                    updateSection({
                      _id: id,
                      content: { links: updatedLinks },
                    })
                  );
                }}
              />
            </span>
          ))}

          {isSelected && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                addLink();
              }}
              className="flex items-center gap-1 px-2 py-1 text-xs text-muted-foreground border border-dashed border-muted rounded-md hover:text-primary hover:border-primary hover:bg-muted transition"
            >
              <Plus className="h-3 w-3" />
              Add link
            </button>
          )}
          <ModeToggle />
        </nav>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <AlignRight className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>

            <div className="flex flex-col gap-4 pt-6">
              {content.links.map((link, index) => (
                <span
                  key={index}
                  className="py-2 text-lg font-medium transition-colors hover:text-primary"
                >
                  <EditableText
                    value={link.title}
                    sectionId={id}
                    isSelected={isSelected}
                    onChange={(val) => {
                      const updatedLinks = [...content.links];
                      updatedLinks[index] = {
                        ...updatedLinks[index],
                        title: val,
                      };

                      dispatch(
                        updateSection({
                          _id: id,
                          content: { links: updatedLinks },
                        })
                      );
                    }}
                  />
                </span>
              ))}
              {isSelected && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addLink();
                  }}
                  className="flex items-center gap-1 px-2 py-1 text-xs text-muted-foreground border border-dashed border-muted rounded-md hover:text-primary hover:border-primary hover:bg-muted transition"
                >
                  <Plus className="h-3 w-3" />
                  Add link
                </button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Nav;
