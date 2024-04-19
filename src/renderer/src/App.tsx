import { ActionButtonContainer, Content, DraggableTopBar, RootLayout, Sidebar } from './components'

const App = () => {
  return (
    <>
      <DraggableTopBar></DraggableTopBar>
      <RootLayout>
        <Sidebar className="p-2">
          <ActionButtonContainer className="flex justify-between items-center mt-1"></ActionButtonContainer>
        </Sidebar>
        <Content className="border-l bg-zinc-900/50 border-l-white/20">Content</Content>
      </RootLayout>
    </>
  )
}

export default App
