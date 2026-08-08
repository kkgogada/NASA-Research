import { useRoute } from './lib/router.js'
import { useBoard } from './lib/board.js'
import StarField from './components/StarField.jsx'
import { Footer, Nav } from './components/Chrome.jsx'
import Explore from './pages/Explore.jsx'
import Missions from './pages/Missions.jsx'
import Topics from './pages/Topics.jsx'
import Compare from './pages/Compare.jsx'
import BoardPage from './pages/Board.jsx'
import TimelinePage from './pages/TimelinePage.jsx'
import Glossary from './pages/Glossary.jsx'
import { CollectionDetail, MissionDetail, NotFound, TopicDetail } from './pages/Detail.jsx'

export default function App() {
  const route = useRoute()
  const board = useBoard()
  const [head, param] = route.segments

  const page = (() => {
    switch (head) {
      case undefined:
        return <Explore board={board} />
      case 'missions':
        return <Missions board={board} />
      case 'topics':
        return <Topics board={board} />
      case 'mission':
        return <MissionDetail slug={param} board={board} />
      case 'topic':
        return <TopicDetail id={param} board={board} />
      case 'collection':
        return <CollectionDetail id={param} board={board} />
      case 'timeline':
        return <TimelinePage />
      case 'glossary':
        return <Glossary />
      case 'compare':
        return <Compare query={route.query} board={board} />
      case 'board':
        return <BoardPage board={board} />
      default:
        return <NotFound />
    }
  })()

  return (
    <>
      <StarField />
      <div className="app">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Nav route={route} savedCount={board.items.length} />
        <main id="main">{page}</main>
        <Footer />
      </div>
    </>
  )
}
