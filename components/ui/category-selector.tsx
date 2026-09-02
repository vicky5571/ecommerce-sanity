"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Category } from "@/sanity.types";

interface CategorySelectorProps {
  categories: Category[];
}

export function CategorySelectorComponent({
  categories,
}: CategorySelectorProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>("");
  const router = useRouter();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full max-w-full flex justify-between items-center bg-white hover:bg-[#E0F2FE] hover:text-[#0284C7] hover:border-[#0284C7] text-slate-800 border border-[#BAE6FD] font-medium py-2 px-4 rounded-full shadow-2xs transition-all"
        >
          <span>
            {value
              ? categories.find((category) => category._id === value)?.title
              : "Filter by Category"}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder="Search category..."
            className="h-9"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const selectedCategory = categories.find((c) =>
                  c.title
                    ?.toLowerCase()
                    .includes(e.currentTarget.value.toLowerCase()),
                );
                if (selectedCategory?.slug?.current) {
                  setValue(selectedCategory._id);
                  window.scrollTo({ top: 0, behavior: "instant" });
                  router.push(`/categories/${selectedCategory.slug.current}`);
                  setOpen(false);
                }
              }
            }}
          />

          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {categories.map((category) => (
                <CommandItem
                  key={category._id}
                  value={category.title}
                  onSelect={() => {
                    if (category.slug?.current) {
                      setValue(category._id);
                      window.scrollTo({ top: 0, behavior: "instant" });
                      router.push(`/categories/${category.slug.current}`);
                    } else {
                      console.warn(`Category "${category.title}" has no slug.`);
                    }
                    setOpen(false);
                  }}
                >
                  {category.title}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === category._id ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}

              {/* {categories.map((category) => (
                <CommandItem
                  key={category._id}
                  value={category.title}
                  onSelect={() => {
                    setValue(category._id);
                    router.push(`/categories/${category.slug.current}`);
                    setOpen(false);
                  }}
                >
                  {category.title}
                  <Check className={cn("ml-auto h-4 w-4", value === category._id ? "opacity-100" : "opacity-0")} />
                </CommandItem>
              ))} */}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
