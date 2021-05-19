import React from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";

class JokeList extends React.Component {
  static defaultProps = {
    numJokesToGet: 10
  };
  constructor(props) {
    super(props);
    this.state = { 
      jokes: []
    };
    this.getJokes = this.getJokes.bind(this);
    this.generateNewJokes = this.generateNewJokes.bind(this);
    this.vote = this.vote.bind(this);
  }

  componentDidMount() {

    if (this.state.jokes.length < this.props.numJokesToGet) this.getJokes();
  }

  /* retrieve jokes from API */
  async getJokes() {
      debugger;
    let j = this.state.jokes;
    let seenJokes = new Set();
    try {
      while (j.length < this.props.numJokesToGet) {
        let res = axios.get("https://icanhazdadjoke.com", {
          headers: { Accept: "application/json" }
        });
        let { status, ...jokeObj } = res.data;

        if (!seenJokes.has(jokeObj.id)) {
          seenJokes.add(jokeObj.id);
          j.push({ ...jokeObj, votes: 0 });
        } else {
          console.error("duplicate found!");
        }
      }
      this.setState({j});
    } catch (e) {
      console.log(e);
    }
  }

      // if (this.state.jokes === 0) this.getJokes();

    // }
    /* empty joke list and then call getJokes */

    generateNewJokes() {
      this.setState.jokes = [];
    }

  /* change vote for this id by delta (+1 or -1) */  
    vote = (id, delta) => {
      this.setState.jokes.map(allJokes =>
        allJokes.map(j => (j.id === id ? { ...j, votes: j.votes + delta } : j))
      );
    }
    /* render: either loading spinner or list of sorted jokes. */
    render() {
    if (this.state.jokes.length) {
      let sortedJokes = this.state.jokes.sort((a, b) => b.votes - a.votes);

      return (
        <div className="JokeList">
          <button className="JokeList-getmore" onClick={this.generateNewJokes}>
            Get New Jokes
          </button>
    
          {sortedJokes.map(j => (
            <Joke text={j.joke} key={j.id} id={j.id} votes={j.votes} vote={this.vote} />
          ))}
        </div>
      )
    }
    return null;
  }
}

export default JokeList;