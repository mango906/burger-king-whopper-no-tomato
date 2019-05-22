it("should render post items", () => {
  const posts = [
    {
      id: 1,
      author: "first",
      title: "first title",
      created: "2019-05-22T12:00:03.411Z",
      comments: []
    },
    {
      id: 2,
      author: "second",
      title: "second title",
      created: "2019-05-22T12:00:03.411Z",
      comments: []
    },
    {
      id: 3,
      author: "third",
      title: "third title",
      created: "2019-05-22T12:00:03.411Z",
      comments: []
    }
  ];

  cy.server();
  cy.visit("/");
  cy.route("/post/count", { count: 3 });
  cy.route("/post/1", { posts });
  cy.get("tbody tr").within(items => {
    expect(items).to.have.length(3);
  });
});
