import React from "react";

export const UserDashboard = () => {
  return (
    <div className="container">
      <div style={{ marginTop: "100px", marginRight: "100px" }}>
        <div className="d-flex align-items-center justify-content-between">
          <h1 style={{ marginBottom: "20px" }}>Manage User</h1>
          <a className="btn btn-primary" href="/admin/create-campus">
            Add User
          </a>
        </div>
        <table
          className="table table-striped table-users mb-5"
          style={{ margin: "auto" }}
        >
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Campus Name</th>
              <th scope="col">Campus Type</th>
              <th scope="col">Accreditation</th>
              <th scope="col">Website</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="7" className="text-center">
                There's no data user available
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
