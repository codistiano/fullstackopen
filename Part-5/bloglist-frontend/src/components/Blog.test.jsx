import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test("renders the blogs title and author but not the url or like no.s by default", async () => {
  const blog = {
    title: "Testing sucks! Here's how to make it easy.",
    author: "Abudi",
    url: "https://codistiano.com/blogs/Testing_sucks_heres_how_to_make_it_easy",
    likes: 0,
    id: "6748729258a21b5de996c9a4",
    user: {
      username: "Abudi",
      name: "Abudi",
      blogs: [],
      id: "6746fa846a982d91581c4fbf",
    },
  };

  const user = {
    username: "Abudi",
    name: "Abudi",
    blogs: [],
    id: "6746fa846a982d91581c4fbf",
  };

  render(<Blog blog={blog} user={user} />);

  const author = screen.getByTestId("blog-author");
  const title = screen.getByText(
    "Testing sucks! Here's how to make it easy.",
    { exact: false }
  );
  const hiddenDetails = screen.getByTestId("hidden-details")

  expect(author).toBeDefined();
  expect(title).toBeDefined();
  expect(hiddenDetails).toHaveStyle({ display: "none" })
});

test("the url and no of likes are shown when the buttong controlling the shown details has been clicked", () => {
    const blog = {
        title: "Testing sucks! Here's how to make it easy.",
        author: "Abudi",
        url: "https://codistiano.com/blogs/Testing_sucks_heres_how_to_make_it_easy",
        likes: 0,
        id: "6748729258a21b5de996c9a4",
        user: {
            username: "Abudi",
            name: "Abudi",
            blogs: [],
            id: "6746fa846a982d91581c4fbf",
        },
    };

    const user = {
        username: "Abudi",
        name: "Abudi",
        blogs: [],
        id: "6746fa846a982d91581c4fbf",
    };

    render(<Blog blog={blog} user={user} />);

    const showDetailsButton = screen.getByText("view");
    showDetailsButton.click();

    const url = screen.getByText(
        "https://codistiano.com/blogs/Testing_sucks_heres_how_to_make_it_easy",
        { exact: false }
    );
    const likes = screen.getByText("likes 0");

    expect(url).toBeDefined();
    expect(likes).toBeDefined();
})