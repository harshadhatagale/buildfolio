"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cn } from "@/lib/utils";
import {
  updateSection,
  setSelectedSection,
} from "../../../features/portfolio/portfolioSlice";
import {
  Award,
  Cloud,
  GitBranch,
  Layout,
  Rocket,
  Star,
  Layers,
  Mic,
  Trash,
  Plus,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const iconMap = {
  award: Award,
  cloud: Cloud,
  gitbranch: GitBranch,
  rocket: Rocket,
  star: Star,
  layers: Layers,
  mic: Mic,
};

const EditableText = ({ value, onChange, isSelected, sectionId, className, type }) => {
  const dispatch = useDispatch();

  return (
    <span
      contentEditable
      suppressContentEditableWarning
      className={cn(
        className,
        "px-1 cursor-text",
        isSelected ? "outline outline-2 outline-primary rounded-sm" : "outline-none"
      )}
      onClick={(e) => {
        e.stopPropagation();
        dispatch(setSelectedSection({ _id: sectionId, type }));
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

const EditableParagraph = ({ value, onChange, isSelected, sectionId, className, type }) => {
  const dispatch = useDispatch();

  return (
    <p
      contentEditable
      suppressContentEditableWarning
      className={cn(
        className,
        "px-1 cursor-text whitespace-pre-wrap",
        isSelected ? "outline outline-2 outline-primary rounded-sm" : "outline-none"
      )}
      onClick={(e) => {
        e.stopPropagation();
        dispatch(setSelectedSection({ _id: sectionId, type }));
      }}
      onBlur={(e) => onChange(e.currentTarget.innerText)}
    >
      {value}
    </p>
  );
};

export default function AchievementsSection({ id, content }) {
  const dispatch = useDispatch();
  const device = useSelector((state) => state.portfolio.device);
  const selectedSection = useSelector((state) => state.portfolio.selectedSection);

  const [isSelected, setSelected] = useState(false);

  useEffect(() => {
    setSelected(selectedSection?._id === id);
  }, [selectedSection, id]);

  const gridCols =
    device === "mobile"
      ? "grid-cols-1"
      : device === "tablet"
      ? "grid-cols-2"
      : "grid-cols-3";

  const headingSize =
    device === "mobile"
      ? "text-2xl"
      : device === "tablet"
      ? "text-3xl"
      : "text-4xl";

  const addAchievement = () => {
    const next = [
      ...content.items,
      {
        title: "New Achievement",
        issuer: "Issuer",
        year: "Year",
        description: "Describe the achievement",
        icon: "award",
      },
    ];
    dispatch(updateSection({ _id: id, content: { items: next } }));
  };

  const deleteAchievement = (index) => {
    const next = content.items.filter((_, i) => i !== index);
    dispatch(updateSection({ _id: id, content: { items: next } }));
  };

  return (
    <section
      className="relative w-full py-16 px-6 bg-background"
      onClick={() =>
        dispatch(setSelectedSection({ _id: id, type: "achievements" }))
      }
    >
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <h2 className={cn("font-bold tracking-tight", headingSize)}>
            <EditableText
              value={content.heading}
              sectionId={id}
              type="achievements"
              isSelected={isSelected}
              onChange={(val) =>
                dispatch(updateSection({ _id: id, content: { heading: val } }))
              }
            />
          </h2>

          <EditableParagraph
            value={content.subHeading}
            sectionId={id}
            type="achievements"
            isSelected={isSelected}
            className="text-muted-foreground text-lg"
            onChange={(val) =>
              dispatch(updateSection({ _id: id, content: { subHeading: val } }))
            }
          />
        </div>

        <div className={cn("grid gap-6", gridCols)}>
          {content.items.map((item, index) => {
            const Icon = iconMap[item.icon?.toLowerCase()] || Layout;

            return (
              <Card
                key={index}
                className="relative hover:shadow-xl transition-shadow"
              >
                {isSelected && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteAchievement(index);
                    }}
                    className="absolute top-3 right-3 text-muted-foreground hover:text-destructive"
                  >
                    <Trash size={16} />
                  </button>
                )}

                <CardHeader className="flex flex-col gap-3 items-start">
                  <div className="p-3 rounded-xl bg-muted">
                    <Icon className="h-6 w-6" />
                  </div>

                  <CardTitle>
                    <EditableText
                      value={item.title}
                      sectionId={id}
                      type="achievements"
                      isSelected={isSelected}
                      onChange={(val) => {
                        const next = [...content.items];
                        next[index] = { ...next[index], title: val };
                        dispatch(updateSection({ _id: id, content: { items: next } }));
                      }}
                    />
                  </CardTitle>

                  <CardDescription>
                    <EditableText
                      value={item.issuer}
                      sectionId={id}
                      type="achievements"
                      isSelected={isSelected}
                      onChange={(val) => {
                        const next = [...content.items];
                        next[index] = { ...next[index], issuer: val };
                        dispatch(updateSection({ _id: id, content: { items: next } }));
                      }}
                    />
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-2">
                  <EditableText
                    value={item.year}
                    sectionId={id}
                    type="achievements"
                    isSelected={isSelected}
                    className="text-sm text-muted-foreground"
                    onChange={(val) => {
                      const next = [...content.items];
                      next[index] = { ...next[index], year: val };
                      dispatch(updateSection({ _id: id, content: { items: next } }));
                    }}
                  />

                  <EditableParagraph
                    value={item.description}
                    sectionId={id}
                    type="achievements"
                    isSelected={isSelected}
                    className="text-sm"
                    onChange={(val) => {
                      const next = [...content.items];
                      next[index] = { ...next[index], description: val };
                      dispatch(updateSection({ _id: id, content: { items: next } }));
                    }}
                  />

                  {isSelected && (
                    <EditableText
                      value={item.icon}
                      sectionId={id}
                      type="achievements"
                      isSelected={isSelected}
                      className="text-xs text-muted-foreground"
                      onChange={(val) => {
                        const next = [...content.items];
                        next[index] = { ...next[index], icon: val.toLowerCase() };
                        dispatch(updateSection({ _id: id, content: { items: next } }));
                      }}
                    />
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {isSelected && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              addAchievement();
            }}
            className="w-full py-4 rounded-xl border border-dashed text-muted-foreground hover:text-primary hover:border-primary hover:bg-muted/40 transition flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            Add Achievement
          </button>
        )}
      </div>
    </section>
  );
}
