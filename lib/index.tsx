export interface NumberSchema {
  type: 'number'
}

export interface ObjectSchema<Props extends string> {
  type: 'object'
  properties: {
    [name: Props]: Schema
  }
  required?: Props[]
}

export type Schema = NumberSchema | ObjectSchema<string>

interface Props {
  schema: Schema
}

const Editor = (props: Props): JSX.Element => {
  switch(props.schema.type) {
    case 'object':
      return (
        <>
          <table>
            <tbody>
              {Object.entries(props.schema.properties).map(([name, schema], index) => (
                <tr key={index}>
                  <th>{name}</th>
                  <td>
                    <Editor schema={schema} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )
    case 'number':
      return <input type='number' />
  }
  
}

export default Editor
