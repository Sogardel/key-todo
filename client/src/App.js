import React from 'react';
import axios from 'axios';
import './App.css';
import ktLogo from "./assets/logo.png";


class App extends React.Component{

  state = {
    title : '',
    body : '',
    posts :[]
  };


  
  componentDidMount = ()=>{
    this.getTodoPosts();
  }
  isEnabled= ()=>{   
      if(this.state.title.length<5 || this.state.title.length> 16)
          { 
            alert("Please input the title between " +5+ " and " +16+ " characters");
            return false;}
      else{return true;}
    };

  getTodoPosts = () =>{
    axios.get("/api")
    .then((response) =>{
      const data = response.data;
      this.setState({posts:data});
      console.log("data has been received");
    })
    .catch(()=>{
      alert("error retriving data!");
    })
  }


  handleChnage = ({target})=> {
    const {name, value} = target;
    this.setState({[name]:value});

    
  };

  submit = (event)=>{
    event.preventDefault();
    const payload = {
      title: this.state.title,
      body: this.state.body
    };


    axios({
      url: '/api/save',
      method: 'POST',
      data : payload
    })
    .then(()=>{
      console.log('Data has been sent to the server');
      //bug1
     this.resetUserInputs();
     this.getTodoPosts();
    })
    .catch(()=>{
      console.log('Internal server error')
    })
  };

  deletePost = (id) => {
    try {
      // const {id} = history.location.state.user_id;
       axios({
        url: `api/delete/${id}`,
        method: 'DELETE',
        data : id
      })
      //bug2
      .then(()=>{
        console.log('Data has been sent to the server');
        //bug1
       this.resetUserInputs();
       this.getTodoPosts();
      })    } catch (err) {
        //console.log(err)
        //err.response.data.msg && setError(err.response.data.msg);
    }
};
update = (event)=>{
  event.preventDefault();
  const payload = {
    title: this.state.title,
    body: this.state.body
  };
  axios({
    url: '/api/update',
    method: 'Put',
    data : payload
  })
  .then(()=>{
    console.log('Data has been sent to the server');
    //bug1
    this.resetUserInputs();
    this.getTodoPosts();
  })
  .catch(()=>{
    console.log('Internal server error')
  })
};

  resetUserInputs = () => {
    this.setState({
      title: "",
      body: ""
    })
  };

  displayTodoPost = (posts) =>{

    if(!posts.length) return null;

    return posts.map((post, index)=>(
      <div key = {index} class = 'blog-post-display'>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <td className='profile_button'>
                        <button class = 'delete 'onClick={() => this.deletePost(post._id)}>Delete Todo</button>
                    </td></div>
    ))};
 
  render() {
    console.log('state', this.state);
    const { title, body } = this.state;
    const isEnabled = title.length > 6 && title.length < 15 && body.length > 1 && body.length <=100 ;
    //jSX
    return(

      <div class = 'app'>
            <div className = 'header'>
            <h2>Easy Todo App!</h2>
            <h5>Version 0.3</h5>
            <img className="ktLogo" src={ktLogo} alt="logo" />
            </div>
        <form onSubmit = {this.submit}>
          <div className = "form-input">
          <p>Add a todo title:</p>
           <input
            type = 'text'
            name = 'title'
            value = {this.state.title}
            placeholder = 'todo title'
            onChange={this.handleChnage}/>
          </div>
          <p>Add a todo body:</p>
          <div className = "form-input">
            <textarea 
            placeholder = 'todo description' 
            name = 'body' 
            cols = '30' 
            rows = "10" 
            value={this.state.body}
            onChange={this.handleChnage}/>
          </div>
          <button disabled={!isEnabled}>Add todo!</button>
          </form>
          <div className="blog">
            {this.displayTodoPost(this.state.posts)}
            </div>
        </div>
    )
  }

}

export default App;
