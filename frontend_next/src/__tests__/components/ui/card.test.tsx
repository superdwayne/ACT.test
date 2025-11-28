import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

describe("Card Component", () => {
  it("renders card with all sections", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Test Title</CardTitle>
          <CardDescription>Test Description</CardDescription>
        </CardHeader>
        <CardContent>Test Content</CardContent>
        <CardFooter>Test Footer</CardFooter>
      </Card>
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
    expect(screen.getByText("Test Footer")).toBeInTheDocument();
  });

  it("applies custom className to card", () => {
    const { container } = render(
      <Card className="custom-class">
        <CardContent>Content</CardContent>
      </Card>
    );

    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass("custom-class");
  });

  it("renders card without optional sections", () => {
    render(
      <Card>
        <CardContent>Only Content</CardContent>
      </Card>
    );

    expect(screen.getByText("Only Content")).toBeInTheDocument();
  });
});
