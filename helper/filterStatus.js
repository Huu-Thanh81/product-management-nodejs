module.exports = (query, findQuery) => {
  const filterStatus = [
    {
      name: "Tất cả",
      status: "",
      class: "btn btn-outline-secondary",
      active: false,
    },
    {
      name: "Hoạt động",
      status: "active",
      class: "btn btn-outline-success",
      active: false,
    },
    {
      name: "Dừng hoạt động",
      status: "inactive",
      class: "btn btn-outline-danger",
      active: false,
    },
  ];
  if (query.status) {
    findQuery.status = query.status;
    filterStatus.forEach((filter) => {
      if (filter.status === query.status) {
        filter.active = true;
      }
    });
  } else {
    filterStatus[0].active = true;
  }
  return filterStatus;
};
