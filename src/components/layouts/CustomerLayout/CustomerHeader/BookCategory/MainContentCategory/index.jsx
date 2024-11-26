import CategorySection from './CategorySection';

const MainContentCategory = ({ className, activatedCategory }) => {
  const { slug: parentCategorySlug, children: childrenCategories } = activatedCategory;
  const sortedCategories = [...childrenCategories].sort((a, b) => {
    const aLength = a.children?.length || 0;
    const bLength = b.children?.length || 0;
    return bLength - aLength;
  });
  return (
    <div className={`h-full overflow-y-auto overscroll-contain ${className}`}>
      <div className='grid grid-cols-1 gap-8 px-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {sortedCategories.map((category) => {
          return (
            <CategorySection
              key={category.id}
              parentSlug={parentCategorySlug}
              childrenCategory={category}
            />
          );
        })}
      </div>
    </div>
  );
};
export default MainContentCategory;
