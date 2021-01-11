import Editor, { Schema } from '../lib/index'

const schema: Schema = {
  type: 'object',
  properties: {
    number: {
      type: 'number'
    },
    object: {
      type: 'object',
      properties: {
        subProp1: {
          type: 'number'
        },
        subProp2: {
          type: 'number'
        }
      }
    }
  }
}

const App = (): JSX.Element => (
  <>
    <Editor schema={schema} defaultValue={{
      number: 100,
      object: {
        subProp1: 1,
        subProp2: 2
      }
    }} />
  </>
)

export default App
