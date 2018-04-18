import React from 'react'
import { Link, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Search from './Search'
import Shelf from './Shelf'
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

    this.setState({ shelf: newShelf })
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
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Shelf
                  books={this.state.booksCurrently}
                  title={"Currently Reading"}
                  updateShelf={this.updateShelf.bind(this)} />

                <Shelf
                  books={this.state.booksWant}
                  title={"Want to Read"}
                  updateShelf={this.updateShelf.bind(this)} />

                <Shelf
                  books={this.state.booksRead}
                  title={"Read"}
                  updateShelf={this.updateShelf.bind(this)} />
              </div>
            </div>
            {/* <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div> */}
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />

        <Route path="/search" render={() => (
          <Search backtohome={this.handleSearch.bind(this)}
            updateShelf={this.updateShelf.bind(this)} />
        )} />
      </div>
    )
  }
}


export default App
