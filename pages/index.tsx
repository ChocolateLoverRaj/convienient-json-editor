import Editor, { Schema } from '../lib/index'
import Head from 'next/head'
import {prettyPrintJson} from 'pretty-print-json'

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

const App = (): JSX.Element => {
  const toHtml = (prettyPrintJson ?? window.prettyPrintJson).toHtml
  console.log(toHtml(3))
  return (
    <>
      <Head>
        <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/pretty-print-json@0.4/dist/pretty-print-json.css' />
        <script src='https://cdn.jsdelivr.net/npm/pretty-print-json@0.4/dist/pretty-print-json.min.js' />
      </Head>
      <Editor schema={schema} defaultValue={{
        number: 100,
        object: {
          subProp1: 1,
          subProp2: 2
        }
      }} />
      <p>Output Json</p>
      <div dangerouslySetInnerHTML={{ __html: toHtml(3) }} />
    </>
  )
}

export default App
