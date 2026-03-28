import React, { useState } from "react";
import styles from "./StaticPage.module.css";

const POSTS = [
  { id:1, title:"Top 10 Bus Routes in India for 2026", cat:"Travel Tips", date:"Mar 20, 2026", img:"https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&q=80", excerpt:"Discover the most scenic and popular bus routes across India that every traveller must experience.", readTime:"5 min read" },
  { id:2, title:"How to Get the Best Bus Ticket Deals", cat:"Savings", date:"Mar 15, 2026", img:"https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400&q=80", excerpt:"Smart tips and tricks to save money on your next bus booking with redBus exclusive offers.", readTime:"4 min read" },
  { id:3, title:"Safety+ Program: What It Means for Travellers", cat:"Safety", date:"Mar 10, 2026", img:"https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=400&q=80", excerpt:"Everything you need to know about our Safety+ certification and how it keeps you safe on every trip.", readTime:"3 min read" },
  { id:4, title:"Mumbai to Goa: The Ultimate Bus Travel Guide", cat:"Destinations", date:"Mar 5, 2026", img:"https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&q=80", excerpt:"Plan your perfect Mumbai to Goa bus trip with our comprehensive guide covering routes, timings, and tips.", readTime:"7 min read" },
  { id:5, title:"Bus Hire for Corporate Events: A Complete Guide", cat:"Bus Hire", date:"Feb 28, 2026", img:"https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=400&q=80", excerpt:"How to plan and book buses for corporate events, team outings, and office trips with redBus Hire.", readTime:"6 min read" },
  { id:6, title:"Travelling with Family? Here's What You Need to Know", cat:"Travel Tips", date:"Feb 20, 2026", img:"https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?w=400&q=80", excerpt:"Essential tips for a comfortable and safe family bus journey with children and elderly passengers.", readTime:"5 min read" },
];

const Blog = () => {
  const [active, setActive] = useState(null);
  const cats = ["All", ...Array.from(new Set(POSTS.map(p=>p.cat)))];
  const [cat, setCat] = useState("All");
  const filtered = cat==="All" ? POSTS : POSTS.filter(p=>p.cat===cat);

  if (active) {
    const post = POSTS.find(p=>p.id===active);
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <button className={styles.backBtn} onClick={()=>setActive(null)}>← Back to Blog</button>
          <img src={post.img} alt={post.title} className={styles.blogHeroImg} />
          <div className={styles.blogPostMeta}><span className={styles.catTag}>{post.cat}</span><span>{post.date}</span><span>{post.readTime}</span></div>
          <h1 className={styles.blogPostTitle}>{post.title}</h1>
          <p className={styles.blogPostBody}>{post.excerpt} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
          <p className={styles.blogPostBody}>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.hero} style={{ background:"linear-gradient(135deg,#1447a0,#0d3580)" }}>
        <h1>redBus Blog</h1>
        <p>Travel tips, guides, and stories from the road</p>
      </div>
      <div className={styles.container}>
        <div className={styles.filterRow}>
          {cats.map(c=>(
            <button key={c} className={`${styles.filterBtn} ${cat===c?styles.filterBtnActive:""}`} onClick={()=>setCat(c)}>{c}</button>
          ))}
        </div>
        <div className={styles.blogGrid}>
          {filtered.map(p=>(
            <div key={p.id} className={styles.blogCard} onClick={()=>setActive(p.id)}>
              <img src={p.img} alt={p.title} className={styles.blogImg} />
              <div className={styles.blogCardBody}>
                <div className={styles.blogCardMeta}><span className={styles.catTag}>{p.cat}</span><span className={styles.readTime}>{p.readTime}</span></div>
                <h3 className={styles.blogCardTitle}>{p.title}</h3>
                <p className={styles.blogCardExcerpt}>{p.excerpt}</p>
                <div className={styles.blogCardFooter}><span>{p.date}</span><span className={styles.readMore}>Read More →</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Blog;
