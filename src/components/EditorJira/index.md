/* eslint-disable import/no-anonymous-default-export */
import {
	Editor
} from '@atlaskit/editor-core';
import { WikiMarkupTransformer } from '@atlaskit/editor-wikimarkup-transformer';
import React from 'react';

//import 'node_modules/@atlaskit/css-reset/dist/bundle.css'

type Props = { body: string, viewOnly: boolean };
type State = { source: string };

class EditorJira extends React.PureComponent<Props, State> {
	state: State = { source: this.props.body };

	render() {
		return (
			<div className='dark:bg-default'>
				<Editor
					defaultValue={this.state.source}
					quickInsert={true}
					allowTextColor={true}
					allowRule={true}
					allowTables={{
						allowColumnSorting: true,
						allowColumnResizing: true,
						allowMergeCells: true,
						allowNumberColumn: true,
						allowBackgroundColor: true,
						allowHeaderRow: true,
						allowHeaderColumn: true,
						permittedLayouts: 'all',
					}}
					allowExtension={{
						allowBreakout: true,
					}}
					allowDate={true}
					allowTemplatePlaceholders={{ allowInserting: true }}

					allowHelpDialog={true}
					allowBreakout={true}
					allowPanel
					shouldFocus={true}
					allowStatus
					allowTextAlignment={true}
					allowIndentation={true}
					disabled={this.props.viewOnly}
					contentTransformerProvider={(schema) =>
						new WikiMarkupTransformer(schema)
					}
					allowFindReplace={true}
					allowLayouts={true}
				//taskDecisionProvider={Promise.resolve(getMockTaskDecisionResource())}

				/>
			</div>
		);
	}
}

export default EditorJira;