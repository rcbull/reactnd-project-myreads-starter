import React from 'react'
import { Link, Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import Search from './Search';
import Book from './Book';
import './App.css'

// root component
class App extends React.Component {
  state = {
    showSearchPage: false,
    books: [],
    booksCurrently: [],
    booksWant: [],
    booksRead: [],
    searchedBooks: []
  }

  //load all books on start app
  componentDidMount() {
    this.fetchMyBooks();
  }

  // query all books
  fetchMyBooks() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
      this.updateBooksCurrently();
      this.updateBooksWanted();
      this.updateBooksRead();
    })
  }

  //query books to shelf currently reading
  updateBooksCurrently() {
    this.setState({ booksCurrently: this.state.books.filter((b) => b.shelf === "currentlyReading") })
  }

  //query books to shelf want to read
  updateBooksWanted() {
    this.setState({ booksWant: this.state.books.filter((b) => b.shelf === "wantToRead") })
  }

  //query books to shelf read
  updateBooksRead() {
    this.setState({ booksRead: this.state.books.filter((b) => b.shelf === "read") })
  }

  //update book
  updateShelf(book, newShelf) {
    BooksAPI.update(book, newShelf).then(() => {
      book.shelf = newShelf;
    })

    this.fetchMyBooks();
  }

  //click on search link
  handleSearch = (event) => {

    let { showSearchPage } = this.state;

    if (!showSearchPage) {
      this.setState({ showSearchPage: true });
    } else {
      this.setState({ showSearchPage: false });
      this.fetchMyBooks();
    }
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <Search backtohome={this.handleSearch.bind(this)}
            updateShelf={this.updateShelf.bind(this)}
          />
        ) :
          (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {this.state.booksCurrently.map((book) => (
                          <li key={book.id} className="contact-list-item">
                            <Book
                              book={book}
                              updateShelf={this.updateShelf.bind(this)}
                            />
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {this.state.booksWant.map((book) => (
                          <li key={book.id} className="contact-list-item">
                            <Book
                              book={book}
                              updateShelf={this.updateShelf.bind(this)}
                            />
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {this.state.booksRead.map((book) => (
                          <li key={book.id} className="contact-list-item">
                            <Book
                              book={book}
                              updateShelf={this.updateShelf.bind(this)}
                            />
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              <div className="open-search">
                <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
              </div>
            </div>
          )}
      </div>
    )
  }
}

export default App
