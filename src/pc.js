/**
 * @file index page
 * @author chengong03(chengong03@baidu.com)
 * @date 2017-05-23
 */

import {h, Component, render} from 'preact';
import {Button, SingleConfirm} from 'seeui';

import 'seeui/lib/index.css';
import './pc.css';

export default class Index extends Component {
    handleClick = () => {
        SingleConfirm.show({
            title: '标题',
            children: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
            show: true,
            maskClickClose: true,
            onConfirm() {
                SingleConfirm.hide();
            },
            onCancel() {
                SingleConfirm.hide();
            },
            onHide() {
                SingleConfirm.hide();
            }
        });
    }
    render() {
        return (
            <div className="container">
                <h1>Hello World</h1>
                <Button onClick={this.handleClick}>你好</Button>
            </div>
        );
    }
}

render(
    <Index />,
    document.getElementById('app')
);
