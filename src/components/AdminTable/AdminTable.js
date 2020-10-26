import React from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';

const AdminTable = ({ books, nameFormat, addCustomClass, addCustomIcon }) => {
  const handleDownload = async (url) => {
    try {
      const res = await axios.get(url, {
        responseType: 'blob',
      });
      const newUrl = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = newUrl;
      link.setAttribute('download', 'file.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.log(err);
    }
  };
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
          {books.map((book, index) => {
            return (
              <tr key={book.id}>
                <td>{index + 1}</td>
                <td>{book.user.fullName}</td>
                <td>{book.isbn}</td>
                <td>
                  {/* <Link to={book.attache}>{nameFormat(book.attache)}</Link> */}
                  <p
                    className="download-link"
                    onClick={() => handleDownload(book.attache)}
                  >
                    {nameFormat(book.attache)}
                  </p>
                </td>
                <td className={books.length && addCustomClass(book.status)}>
                  {book.status}
                </td>
                <td>{addCustomIcon(book.status, book.id)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
