## Features

- [x] add fetcher page
前后消息(1) VS unread card(2)?
优点:
1. handle 任意 interval
但是有新消息时不好提示？
不同周期的内容挤在一起
2. 每次有新内容都放 watch list?
- [x] need some intro in the landing page
- [x] create fetcher redirect
notification 在主页的问题：用户注册完，在 explore 页面订阅了，他如何知道要去首页看 notification!!
    answer: 加上 notification 标记！！？
- [x] watch list
- [x] 不同来源的 signup, 做不同的事！帮用户做到他想做的那个操作！TODO: 有一点难，之后做
- [x] user signup/signin
- [x] refine projectCard
  - [x] add time
  - [x] add url
  - [x] add pre/next btn
- [x] unread content
- [x] explore: hot; new; trending
- [x] access limit for different kind of users
- [x] add color to header
- [x] pricing page: user can not pay if they did not login
- [x] render pricing based on config
- [x] ~~member page: only project description~~
- [x] signup modal on mobile: not looking good!
- [x] sign up / sign in error alert user
- [x] 内容 strong 在手机端显示不太友好
- [x] (mobile)show nav on mobile device
- [x] make the hero closable
- [x] (mobile) unread 留白
- [x] drift 只在用户点击时open!
- [x] only show drift on home page
- [x] auto watch
- [x] footer color
- [x] add colors to fetcher
- [x] 变成一小时抓取，查看抓取效果最好的时间
- [x] 创建就两个 notification bug: 因为 project run immeaitaly 了 nextRunAt 要设为 now + interval 或者让用户自己设
- [x] 65折？
- [ ] feature suggestions upvote system
- [ ] open source! so users can contribute and get discount!!!!!!!
- [ ] 打勾，先消失再做request? 
- [ ] (mobile) add to home screen option
- [ ] mixpannel 统计移动端，pc 端用户数量
- [ ] 把fetcher 加完整！
- [ ] 前后消息与抓取时间 closer
- [ ] (mobile) PWA(tabs: home, unread, read it later, watch list) (twitter/instgram)
- [ ] read it later
- [ ] update/del project
- [ ] cancel plan / change payment info
- [ ] 让用户考虑按年支付（打6折）
- [ ] hover hint / onboarding guide?
- [ ] explore: more than hot/new
- [ ] update project UI
- [ ] member page proejct cards
- [ ] browser like ui https://nextjs.org/#file-system-routing  https://codesandbox.io/s/vanilla
- [ ] landing page SEO
- [ ] user define next run at
- [ ] handle fetch fail

## Bugs

- [x] project can not render after creation!!!
- [ ] daily fetcher not working correctly
- [ ] 慢网速下有时加载不出来