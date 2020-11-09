import React from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
import { linkFormat } from './../GlobalFunction';
import LoadingBall from './../commons/LoadingBall/LoadingBall';

const AdminTable = ({
  books,
  addCustomClass,
  addCustomIcon,
  loadingLiteratures,
  setStatusFilter,
  statusFilter,
}) => {
  // const handleDownload = async (url) => {
  //   try {
  //     const res = await axios.get(url, {
  //       responseType: 'blob',
  //     });
  //     const newUrl = window.URL.createObjectURL(new Blob([res.data]));
  //     const link = document.createElement('a');
  //     link.href = newUrl;
  //     link.setAttribute('download', 'file.pdf');
  //     document.body.appendChild(link);
  //     link.click();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div className="container book-verification">
      <div className="admin-header">
        <h1>Literature verification</h1>
        <form>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {/* <option value="" disabled>
              Filter By Status
            </option> */}
            <option className="option-hidden" value="" hidden>
              Filter By Status
            </option>
            <option value="all">All</option>
            <option value="approved">Approved</option>
            <option value="waiting">Waiting</option>
            <option value="canceled">Canceled</option>
          </select>
        </form>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>No</th>
            <th>User or Author</th>
            <th>ISBN</th>
            <th>Literature</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {loadingLiteratures ? (
            <tr>
              <td className="empty-book" colSpan="6">
                <LoadingBall />
              </td>
            </tr>
          ) : !books.length ? (
            <tr>
              <td className="empty-book" colSpan="6">
                <h4>Your literature list is empty.</h4>
              </td>
            </tr>
          ) : (
            books.map((book, index) => {
              return (
                <tr key={book.id}>
                  <td>{index + 1}</td>
                  <td>{book.user.fullName}</td>
                  <td>{book.isbn}</td>
                  <td>
                    {/* <p
                    className="download-link"
                    onClick={() => handleDownload(book.attache)}
                  >
                    {linkFormat(book.attache)}
                  </p> */}
                    <a
                      href={book.attache}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {linkFormat(book.attache)}
                    </a>
                  </td>
                  <td className={books.length && addCustomClass(book.status)}>
                    {book.status}
                  </td>
                  <td>{addCustomIcon(book.status, book.id)}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
