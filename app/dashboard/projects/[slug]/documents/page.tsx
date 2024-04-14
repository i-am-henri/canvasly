"use client"
import {
    BoldExtension,
    CalloutExtension,
    HeadingExtension,
    ItalicExtension,
} from 'remirror/extensions';
import { SocialEditor } from '@remirror/react-editors/social';
import { EditorComponent, Remirror, useRemirror } from '@remirror/react';

export default function Documents({ params }: { params: { slug: string } }) {
    console.log(params)

    const Menu = () => <button onClick={() => alert('TBD')}>B</button>;
    const remirrorJsonFromStorage = {
        type: 'doc',
        content: [
            { type: 'heading', attrs: { level: 1 }, content: [{ type: 'text', text: 'Hello world' }] },
            {
                type: 'paragraph',
                content: [
                    { type: 'text', text: 'Hello ' },
                    { type: 'text', marks: [{ type: 'italic' }], text: 'word' },
                ],
            },
        ],
    };

    const { manager, state } = useRemirror({
        extensions: () => [
            new HeadingExtension({
                levels: [1, 2, 3]
            }),
            new BoldExtension({
                weight: 40
            }),
            new ItalicExtension(),
            new CalloutExtension({ defaultType: 'warn' }),
        ],

        content: remirrorJsonFromStorage,
    });
    return (
        <div>
            <Remirror manager={manager} initialContent={state} >
                <EditorComponent />
                <Menu />
            </Remirror>
        </div>
    )
}