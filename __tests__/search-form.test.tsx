import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SearchForm } from "@/components/layout/search-form";

const { push, searchValue } = vi.hoisted(() => ({
  push: vi.fn(),
  searchValue: {
    current: "",
  },
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push,
  }),
  useSearchParams: () => ({
    get: (key: string) => {
      return key === "s" ? searchValue.current : null;
    },
  }),
}));

describe("SearchForm", () => {
  beforeEach(() => {
    push.mockClear();
    searchValue.current = "";
  });

  it("syncs the input value from the current search params", async () => {
    searchValue.current = "beauty";

    render(<SearchForm />);

    await waitFor(() => {
      expect(screen.getByLabelText("Término de búsqueda")).toHaveValue(
        "beauty",
      );
    });
  });

  it("navigates to the search page with the entered term", async () => {
    render(<SearchForm />);

    const input = screen.getByLabelText("Término de búsqueda");

    await waitFor(() => {
      expect(input).not.toBeDisabled();
    });

    fireEvent.change(input, {
      target: { value: "  phone max  " },
    });
    fireEvent.click(screen.getByRole("button", { name: "Buscar" }));

    expect(push).toHaveBeenCalledWith("/search?s=phone+max");
  });

  it("navigates to search without query when the term is empty", async () => {
    render(<SearchForm />);

    await waitFor(() => {
      expect(screen.getByLabelText("Término de búsqueda")).not.toBeDisabled();
    });

    fireEvent.submit(screen.getByRole("search"));

    expect(push).toHaveBeenCalledWith("/search");
  });
});
