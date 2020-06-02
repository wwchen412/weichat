import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Home =  () => {
    return(
        <div className="home">
        <Header></Header>
        <section >
          <div className="jumbotron jumbotron-fluid mb-0 main_bg homePage d-flex align-items-center">
            <div className="container text-center py-5" >
              <h1 className="display-4"> WeiChat </h1>
              <p className="lead">一個專門用來跟我聊天的地方，快加入吧！</p>
              <div className="mt-4">
                <Link className="btn btn-primary px-5 mr-3" to="/signup">註冊</Link>
                <Link className="btn px-5 btn-outline-primary" to="/login">登入</Link>
              </div>
            </div>
          </div>
        </section>
        <Footer></Footer>
      </div>
    )
}
    

export default Home;