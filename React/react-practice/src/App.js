import "./App.css";
import { useState } from "react"; // 상태 작성을 위한 import

function Create(props) {
  return (
    <article>
      <h2>Create</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const title = event.target.title.value;
          const body = event.target.body.value;
          props.onCreate(title, body);
        }}
      >
        <p>
          <input type="text" name="title" placeholder="title" />
        </p>
        <p>
          <textarea name="body" placeholder="body"></textarea>
        </p>
        <p>
          <input type="submit" value="create"></input>
        </p>
      </form>
    </article>
  );
}

// 매개변수로 props를 던져준다.
function Header(props) {
  return (
    <header>
      <h1>
        <a
          href="/"
          onClick={(event) => {
            event.preventDefault(); // 클릭해도 이벤트가 일어나지 않게 설정
            props.onChangeMode(); // props의 이벤트도 프로퍼티로 줘서 사용
          }}>{props.title}
        </a>
      </h1>
    </header>
  );
}

function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      <h3>{props.description}</h3>
    </article>
  );
}

function Nav(props) {
  const lis = [];

  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(
      <li key={t.id}>
        <a
          id={t.id}
          href={"/read/" + t.id}
          onClick={(event) => {
            event.preventDefault();
            props.onChangeMode(Number(event.target.id)); // event.target : 특정 이벤트를 유발시킨 태그
          }}
        >
          {t.title}
        </a>
      </li>
    );
  }

  return (
    <nav>
      <ol>{lis}</ol>
    </nav>
  );
}

function App() {
  // mode(data, function) data : 상태 정의 데이터, function : 상태 변경을 위한 함수
  const [mode, setMode] = useState("WELCOME");

  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "javascript", body: "javascript is ..." },
  ]);

  let content = null;

  if (mode === "WELCOME") {
    content = (
      <Article title="WELCOME!" description="Web is Stronger than me"></Article>
    );
  } else if (mode === "READ") {
    let title,
      body = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} description={body}></Article>;
  } else if (mode === "CREATE") {
    content = (
      <Create
        onCreate={(_title, _body) => {
          const newTopic = { id: nextId, title: _title, body: _body };
          const newTopics = [...topics] // 객체의 경우에는 ... 으로 복제본을 만든다
          newTopics.push(newTopic);
          setTopics(newTopics); // set할때 값이 다르면 다시 렌더링을 한다.
          setMode('READ');
          setId(nextId);
          setNextId(nextId+1);
        }}
      ></Create>
    );
  }

  return (
    <div>
      <Header
        title="REACT"
        onChangeMode={() => {
          setMode("WELCOME");
        }}
      ></Header>
      <Nav
        topics={topics}
        onChangeMode={(_id) => {
          setMode("READ");
          setId(_id);
        }}
      ></Nav>
      {content}
      <ul>
        <li>
          <a href="/create" onClick={(event) => {
              event.preventDefault();
              setMode("CREATE");
            }}>Create
          </a>
        </li>
        <li>
          <a href="/update">Update</a>
        </li>
      </ul>
    </div>
  );
}

export default App;
