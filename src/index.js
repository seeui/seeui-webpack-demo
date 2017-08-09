/**
 * @file index page
 * @author chengong03(chengong03@baidu.com)
 * @date 2017-05-23
 */

import {h, Component, render} from 'preact';
import {Button, SingleDialog} from 'seeui-mobile';

import './index.styl';

export default class Index extends Component {
    handleClick() {
        console.log('clicked');
    }
    render() {
        return (
            <div className="container">
                <h1>Hello World</h1>
                <Button
                    onClick={() => {
                        this.handleClick();
                    }}
                >你好</Button>
            </div>
        );
    }
}

render(
    <Index />,
    document.getElementById('app')
);
