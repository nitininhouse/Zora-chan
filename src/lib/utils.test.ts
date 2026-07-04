import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("merges tailwind classes without duplicates", () => {
    expect(cn("px-2", "px-4", "text-sm")).toBe("px-4 text-sm");
  });

  it("handles conditional classes", () => {
    expect(cn("base", false && "hidden", "extra")).toBe("base extra");
  });
});
