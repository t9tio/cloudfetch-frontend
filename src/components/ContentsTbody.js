import React from "react";

function Footer ({contents, contentGroups}) {

    // [{innerText, href}]
    const contentArr = JSON.parse(contents).contents;

    // [[1,2],[3,4]]
    const groupArr = JSON.parse(contentGroups);

    const contentTBody = groupArr.map((group, i) => 
        <tr key={`group_${i}`}>
            <td>
                {
                    group.map(index => {
                        const content = contentArr[index];
                        if (content) {
                            if (content.href) {
                                return <span>
                                    <a href={content.href}>{content.innerText}</a>
                                </span> 
                            } else {
                                return <span>
                                    {content.innerText} 
                                </span>
                            }
                        }
                    }).reduce((pre, cur) => {
                        if (pre.length > 0) {
                            pre.push(<span>&nbsp;|&nbsp;</span>);
                        }
                        pre.push(cur);
                        return pre;
                    }, [])
                }
            </td>
        </tr>
    );
    
    return (
        <tbody>
            {contentTBody}
        </tbody>
    );
}
export default Footer;