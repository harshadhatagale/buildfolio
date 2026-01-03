"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";
import { Plus, Trash } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  updateSection,
  setSelectedSection,
} from "../../../features/portfolio/portfolioSlice";

const EditableText = ({ value, onChange, isSelected, sectionId, className }) => {
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
        dispatch(setSelectedSection({ _id: sectionId, type: "certifications" }));
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
        dispatch(setSelectedSection({ _id: sectionId, type: "certifications" }));
      }}
      onBlur={(e) => onChange(e.currentTarget.innerText)}
    >
      {value}
    </p>
  );
};

export default function CertificationsSection({ id, content }) {
  const dispatch = useDispatch();
  const device = useSelector((state) => state.portfolio.device);
  const selectedSection = useSelector(
    (state) => state.portfolio.selectedSection
  );

  const [isSelected, setSelected] = useState(false);

  useEffect(() => {
    setSelected(selectedSection?._id === id);
  }, [selectedSection, id]);

  const getIcon = (iconName) => {
    if (!iconName) return LucideIcons.Layout;

    const formatted = iconName
      .toLowerCase()
      .split(/[-_ ]+/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join("");

    return LucideIcons[formatted] || LucideIcons.Layout;
  };

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

  const addCertification = () => {
    const next = [
      ...(content.items || []),
      {
        title: "Certification Name",
        issuer: "Issuer",
        year: "Year",
        description: "Describe this certification",
        icon: "layout",
        link: "",
      },
    ];
    dispatch(updateSection({ _id: id, content: { items: next } }));
  };

  const deleteCertification = (index) => {
    const next = content.items.filter((_, i) => i !== index);
    dispatch(updateSection({ _id: id, content: { items: next } }));
  };

  return (
    <section
      className="relative w-full py-16 px-6 bg-background"
      onClick={() =>
        dispatch(setSelectedSection({ _id: id, type: "certifications" }))
      }
    >
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <h2 className={cn("font-bold tracking-tight", headingSize)}>
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
            value={content.subHeading}
            sectionId={id}
            isSelected={isSelected}
            className="text-muted-foreground text-lg"
            onChange={(val) =>
              dispatch(
                updateSection({
                  _id: id,
                  content: { subHeading: val },
                })
              )
            }
          />
        </div>

        <div className={cn("grid gap-6", gridCols)}>
          {content.items?.map((item, index) => {
            const Icon = getIcon(item.icon);

            return (
              <Card key={index} className="relative hover:shadow-xl transition">
                {isSelected && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteCertification(index);
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
                      isSelected={isSelected}
                      onChange={(val) => {
                        const next = [...content.items];
                        next[index] = { ...next[index], title: val };
                        dispatch(
                          updateSection({ _id: id, content: { items: next } })
                        );
                      }}
                    />
                  </CardTitle>

                  <CardDescription>
                    <EditableText
                      value={item.issuer}
                      sectionId={id}
                      isSelected={isSelected}
                      onChange={(val) => {
                        const next = [...content.items];
                        next[index] = { ...next[index], issuer: val };
                        dispatch(
                          updateSection({ _id: id, content: { items: next } })
                        );
                      }}
                    />
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-2">
                  <EditableText
                    value={item.year}
                    sectionId={id}
                    isSelected={isSelected}
                    className="text-sm text-muted-foreground"
                    onChange={(val) => {
                      const next = [...content.items];
                      next[index] = { ...next[index], year: val };
                      dispatch(
                        updateSection({ _id: id, content: { items: next } })
                      );
                    }}
                  />

                  <EditableParagraph
                    value={item.description}
                    sectionId={id}
                    isSelected={isSelected}
                    className="text-sm"
                    onChange={(val) => {
                      const next = [...content.items];
                      next[index] = { ...next[index], description: val };
                      dispatch(
                        updateSection({ _id: id, content: { items: next } })
                      );
                    }}
                  />

                  {isSelected && (
                    <EditableText
                      value={item.icon}
                      sectionId={id}
                      isSelected={isSelected}
                      className="text-xs text-muted-foreground"
                      onChange={(val) => {
                        const next = [...content.items];
                        next[index] = {
                          ...next[index],
                          icon: val.toLowerCase(),
                        };
                        dispatch(
                          updateSection({ _id: id, content: { items: next } })
                        );
                      }}
                    />
                  )}
                </CardContent>

                {item.link && (
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full pointer-events-none"
                    >
                      View Certificate
                      <LucideIcons.ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                )}
              </Card>
            );
          })}
        </div>

        {isSelected && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              addCertification();
            }}
            className="w-full py-4 rounded-xl border border-dashed text-muted-foreground hover:text-primary hover:border-primary hover:bg-muted/40 transition flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            Add Certification
          </button>
        )}
      </div>
    </section>
  );
}
