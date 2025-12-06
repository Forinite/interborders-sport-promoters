// // utils/sanityToTiptap.ts
// export function sanityToTiptap(blocks: any[]) {
//     if (!blocks || !Array.isArray(blocks)) return [];
//
//     return blocks.map(block => {
//         if (block._type !== 'block') return null;
//
//         let type: string;
//         switch (block.style) {
//             case 'h1': type = 'heading'; break;
//             case 'h2': type = 'heading'; break;
//             case 'h3': type = 'heading'; break;
//             case 'h4': type = 'heading'; break;
//             case 'h5': type = 'heading'; break;
//             case 'h6': type = 'heading'; break;
//             default: type = 'paragraph';
//         }
//
//         const level = block.style.startsWith('h') ? parseInt(block.style[1]) : undefined;
//
//         return {
//             type,
//             ...(level ? { attrs: { level } } : {}),
//             content: block.children?.map((child: any) => ({
//                 type: 'text',
//                 text: child.text || ''
//             }))
//         };
//     }).filter(Boolean);
// }
