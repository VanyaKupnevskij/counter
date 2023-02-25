import './App.css';

import Page from './components/Page';
import Counter from './components/Counter';

export default function App() {
  return (
    <div className="App">
      <Page>
        <Counter min={-10} max={10} />
      </Page>
    </div>
  );
}
