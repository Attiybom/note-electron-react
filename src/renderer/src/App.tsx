import {
  ActionButtonContainer,
  Content,
  DraggableTopBar,
  NotePreviewList,
  RootLayout,
  Sidebar
} from './components'

const App = () => {
  return (
    <>
      <DraggableTopBar></DraggableTopBar>
      <RootLayout>
        <Sidebar className="p-2">
          <ActionButtonContainer className="flex justify-between items-center mt-1" />
          <NotePreviewList className="mt-3 space-y-2" />
        </Sidebar>
        <Content className="border-l bg-zinc-900/50 border-l-white/20">暂无内容</Content>
      </RootLayout>
    </>
  )
}

export default App
