import React from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
import { linkFormat } from './../GlobalFunction';
import LoadingSpinner from './../commons/LoadingSpinner/LoadingSpinner';

const AdminTable = ({
  books,
  addCustomClass,
  addCustomIcon,
  loadingLiteratures,
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
      <h1>Literature verification</h1>
      <table className="admin-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Users or Author</th>
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
                <LoadingSpinner />
              </td>
            </tr>
          ) : !books.length ? (
            <tr>
              <td className="empty-book" colSpan="6">
                Books is empty
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
                    {/* <Link to={book.attache}>{nameFormat(book.attache)}</Link> */}
                    {/* <p
                    className="download-link"
                    onClick={() => handleDownload(book.attache)}
                  >
                    {linkFormat(book.attache)}
                  </p> */}
                    <a href={book.attache}>{linkFormat(book.attache)}</a>
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
