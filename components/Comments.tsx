"use client";
import React, { Component, createRef, useEffect, useState } from 'react';
import { useTheme } from 'next-themes'; 

interface CommentsProps {
}

interface CommentsState {
}

export default class Comments extends Component<CommentsProps, CommentsState> {
    private commentBox = createRef<HTMLDivElement>();

    componentDidMount() {
        this.loadUtterances();
    }

    componentDidUpdate(prevProps: CommentsProps, prevState: CommentsState) {
        if (this.props !== prevProps || this.state !== prevState) { 
            const existingScript = this.commentBox.current?.querySelector('script[src*="utteranc.es"]');
            if (existingScript) {
                existingScript.remove();
            }
            this.loadUtterances();
        }
    }


    loadUtterances = () => {
        const theme = document.documentElement.classList.contains('dark') ? 'github-dark' : 'github-light';


        let scriptEl = document.createElement("script");
        scriptEl.setAttribute("src", "https://utteranc.es/client.js");
        scriptEl.setAttribute("crossorigin", "anonymous");
        scriptEl.setAttribute("async", "true");
        scriptEl.setAttribute("repo", "Manish-tamang/comments");
        scriptEl.setAttribute("issue-term", "title");
        scriptEl.setAttribute("theme", theme);
        if (this.commentBox.current) {
            this.commentBox.current.appendChild(scriptEl);
        }
    };


    render() {
        return (
            <div style={{ width: '100%' }} id="comments">
                <div ref={this.commentBox}></div>
            </div>
        );
    }
}

export const CommentsFunctional = () => {
    const commentBox = createRef<HTMLDivElement>();
    const { theme } = useTheme(); 

    useEffect(() => {
        const loadUtterances = () => {
            if (!theme) return; 

            const utterancesTheme = theme === 'dark' ? 'github-dark' : 'github-light';

            let scriptEl = document.createElement("script");
            scriptEl.setAttribute("src", "https://utteranc.es/client.js");
            scriptEl.setAttribute("crossorigin", "anonymous");
            scriptEl.setAttribute("async", "true");
            scriptEl.setAttribute("repo", "Manish-tamang/comments"); 
            scriptEl.setAttribute("issue-term", "title");
            scriptEl.setAttribute("theme", utterancesTheme);
            const existingScript = commentBox.current?.querySelector('script[src*="utteranc.es"]');
            if (existingScript) {
                existingScript.remove();
            }

            if (commentBox.current) {
                commentBox.current.appendChild(scriptEl);
            }
        };

        loadUtterances();
    }, [theme]);


    return (
        <div style={{ width: '100%' }} id="comments">
            <div ref={commentBox}></div>
        </div>
    );
};