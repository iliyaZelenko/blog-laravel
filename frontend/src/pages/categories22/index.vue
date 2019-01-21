<!--<template>-->
  <!--<div class="w-100 h-100">-->
    <!--<h1 class="display-1">-->
      <!--Categories-->
    <!--</h1>-->

    <!--<v-subheader class="pa-0">-->
      <!--Where do you live?-->
    <!--</v-subheader>-->

    <!--Выбираешь категории и они добавляются в breadcrumbs. Когда выбрана конечная категория, то возможно переходишь на ее маршрут.-->
    <!--Гранить состояние прохождения каждого теста в бд, чтобы если пользователь прервал тест(например, перезагрузил страницу),-->
    <!--то можно было выбрать последний не пройденный тест или один из других не пройденных тестов.-->
    <!--Надо после каждого ответа хранить состояние в бд и время старта теста чтобы знать сколько он идет.-->

    <!--&lt;!&ndash;-->
    <!--<v-breadcrumbs-->
      <!--:items="breadcrumbs"-->
      <!--divider="/"-->
    <!--&gt;-->
      <!--<template-->
        <!--slot="item"-->
        <!--slot-scope="{ item }"-->
      <!--&gt;-->
        <!--<a-->
          <!--:class="[i === breadcrumbs.length && 'grey&#45;&#45;text']"-->
          <!--href="#"-->
          <!--@click="item.onClick(i)"-->
        <!--&gt;-->
          <!--{{ item.text }}-->
          <!--&lt;!&ndash;{{ item.text.toUpperCase() }}&ndash;&gt;-->
        <!--</a>-->
      <!--</template>-->
    <!--</v-breadcrumbs>-->
    <!--&ndash;&gt;-->
    <!--<v-breadcrumbs divider="/">-->
      <!--<v-breadcrumbs-item-->
        <!--v-for="(item, i) in breadcrumbs"-->
        <!--:key="'breadcrumbs-' + i"-->
        <!--:disabled="i === breadcrumbs.length - 1"-->
      <!--&gt;-->
        <!--<span @click="item.onClick(i)">-->
          <!--{{ item.text }}-->
        <!--</span>-->
      <!--</v-breadcrumbs-item>-->
    <!--</v-breadcrumbs>-->

    <!--&lt;!&ndash;<div>&ndash;&gt;-->
    <!--&lt;!&ndash;<v-spacer/>&ndash;&gt;-->
    <!--&lt;!&ndash;</div>&ndash;&gt;-->

    <!--<v-toolbar-->
      <!--color="teal"-->
      <!--dark-->
    <!--&gt;-->
      <!--<v-toolbar-title>State selection</v-toolbar-title>-->
      <!--<v-autocomplete-->
        <!--v-show="showSearch"-->
        <!--v-model="selectedCategoryInSearch"-->
        <!--:items="categoriesForSearch"-->
        <!--:loading="loading"-->
        <!--class="mx-3"-->
        <!--label="Search by category"-->
        <!--item-text="name"-->
        <!--prepend-inner-icon="search"-->
        <!--return-object-->
        <!--solo-inverted-->
        <!--hide-details-->
        <!--flat-->
      <!--&gt;-->
        <!--&lt;!&ndash;<v-slide-x-reverse-transition&ndash;&gt;-->
        <!--&lt;!&ndash;slot="append-outer"&ndash;&gt;-->
        <!--&lt;!&ndash;mode="out-in"&ndash;&gt;-->
        <!--&lt;!&ndash;&gt;&ndash;&gt;-->
        <!--&lt;!&ndash;<v-icon&ndash;&gt;-->
        <!--&lt;!&ndash;:color="isEditing ? 'success' : 'info'"&ndash;&gt;-->
        <!--&lt;!&ndash;:key="`icon-${isEditing}`"&ndash;&gt;-->
        <!--&lt;!&ndash;@click="isEditing = !isEditing"&ndash;&gt;-->
        <!--&lt;!&ndash;v-text="isEditing ? 'mdi-check-outline' : 'mdi-circle-edit-outline'"&ndash;&gt;-->
        <!--&lt;!&ndash;&gt;</v-icon>&ndash;&gt;-->
        <!--&lt;!&ndash;</v-slide-x-reverse-transition>&ndash;&gt;-->
      <!--</v-autocomplete>-->
      <!--<v-btn icon>-->
        <!--<v-icon>more_vert</v-icon>-->
      <!--</v-btn>-->
    <!--</v-toolbar>-->

    <!--&lt;!&ndash;<pre>&ndash;&gt;-->
    <!--&lt;!&ndash;{{ categories }}&ndash;&gt;-->
    <!--&lt;!&ndash;</pre>&ndash;&gt;-->

    <!--&lt;!&ndash;<div&ndash;&gt;-->
    <!--&lt;!&ndash;v-for="category of categories"&ndash;&gt;-->
    <!--&lt;!&ndash;:key="category.name"&ndash;&gt;-->
    <!--&lt;!&ndash;&gt;&ndash;&gt;-->
    <!--&lt;!&ndash;{{ category.name }}&ndash;&gt;-->
    <!--&lt;!&ndash;</div>&ndash;&gt;-->

    <!--&lt;!&ndash;<no-ssr placeholder="Loading...">&ndash;&gt;-->
    <!--<v-container-->
      <!--class="teal lighten-4"-->
      <!--grid-list-md-->
    <!--&gt;-->
      <!--&lt;!&ndash; TODO Хотя нужно показывать тесты когда и не дошел док конца &ndash;&gt;-->
      <!--<span v-if="selectedCategory && !selectedCategory.have_child">-->
        <!--Нет вложеных категорий-->
      <!--</span>-->

      <!--<v-layout-->
        <!--justify-center-->
        <!--align-center-->
        <!--row-->
        <!--wrap-->
      <!--&gt;-->
        <!--<v-flex-->
          <!--v-for="category in categoriesForSearch"-->
          <!--:key="category.name"-->
          <!--xs4-->
        <!--&gt;-->
          <!--<category-->
            <!--:info="category"-->
            <!--:root="true"-->
            <!--@select="selectedCategoryInSearch = arguments[0]"-->
          <!--/>-->
        <!--</v-flex>-->
      <!--</v-layout>-->
    <!--</v-container>-->

    <!--&lt;!&ndash;1&ndash;&gt;-->
    <!--&lt;!&ndash;<pre>&ndash;&gt;-->
    <!--&lt;!&ndash;{{ categories }}&ndash;&gt;-->
    <!--&lt;!&ndash;</pre>&ndash;&gt;-->
    <!--&lt;!&ndash;<br>&ndash;&gt;-->
    <!--&lt;!&ndash;2&ndash;&gt;-->
    <!--&lt;!&ndash;<pre>&ndash;&gt;-->
    <!--&lt;!&ndash;{{ categoriesForSearch }}&ndash;&gt;-->
    <!--&lt;!&ndash;</pre>&ndash;&gt;-->

    <!--&lt;!&ndash;3&ndash;&gt;-->
    <!--&lt;!&ndash;<pre>&ndash;&gt;-->
    <!--&lt;!&ndash;{{ selectedCategory }}&ndash;&gt;-->
    <!--&lt;!&ndash;</pre>&ndash;&gt;-->
    <!--&lt;!&ndash;</no-ssr>&ndash;&gt;-->
  <!--</div>-->
<!--</template>-->

<!--<script>-->
<!--import Category from '~/components/pages/categories/Category.vue'-->

<!--export default {-->
  <!--name: 'SelfDevelopmentTestsCategories',-->
  <!--components: { Category },-->
  <!--async asyncData ({ app }) {-->
    <!--// sd/tests/-->
    <!--const categories = await app.$get('categories')-->

    <!--return { categories }-->
  <!--},-->
  <!--data () {-->
    <!--return {-->
      <!--selectedCategoryInSearch: null,-->
      <!--selectedCategory: null,-->
      <!--loading: false,-->
      <!--categories: [],-->
      <!--// breadcrumbs: [{ text: 'Саморазвитие' }, { text: 'Тесты' }, { text: 'Выбор категории', disabled: true }],-->
      <!--categoriesHistory: [],-->
      <!--breadcrumbsItemsStart: [-->
        <!--{-->
          <!--text: 'Главная',-->
          <!--onClick: () => {-->
            <!--// location.href = '/categories'-->
            <!--this.$router.push(-->
              <!--this.localePath('index')-->
            <!--)-->
          <!--} // /self-development-->
        <!--},-->
        <!--{-->
          <!--text: 'Категории',-->
          <!--// TODO просто onClick: document.location.reload-->
          <!--onClick: () => {-->
            <!--// document.location.reload()-->
            <!--// location.href = '/categories'-->
            <!--this.$router.push(-->
              <!--this.localePath('categories')-->
            <!--)-->
          <!--} // /self-development-->
        <!--}-->
        <!--// {-->
        <!--//   text: 'Тесты',-->
        <!--//   onClick: () => { document.location.reload() } // this.$forceUpdate // () => this.switchUrl('/self-development/tests')-->
        <!--// }-->
      <!--]-->
    <!--}-->
  <!--},-->
  <!--computed: {-->
    <!--categoriesForSearch () {-->
      <!--return this.selectedCategory ? this.selectedCategory.children : this.categories-->
    <!--},-->
    <!--showSearch () {-->
      <!--return !this.selectedCategory || this.selectedCategory.have_child-->
    <!--},-->
    <!--breadcrumbs () {-->
      <!--const result = [...this.breadcrumbsItemsStart]-->

      <!--if (!this.selectedCategory) {-->
        <!--result.push({-->
          <!--text: 'Выбор категории'-->
        <!--})-->
      <!--} else {-->
        <!--result.push(-->
          <!--...this.categoriesHistory.map(i => ({-->
            <!--text: i.name,-->
            <!--onClick: this.breadcrumbsCategoryClick-->
          <!--}))-->
        <!--)-->
      <!--}-->

      <!--return result-->
    <!--}-->
  <!--},-->
  <!--watch: {-->
    <!--async selectedCategoryInSearch (selected) {-->
      <!--if (selected) {-->
        <!--if (!selected.children) {-->
          <!--this.loading = true-->
          <!--const categories = await this.$get('category-children/' + selected.id)-->
          <!--this.loading = false-->
          <!--// console.log(selectedCategory === this.selectedCategory)-->

          <!--selected.children = categories-->
        <!--}-->

        <!--this.selectedCategory = { ...selected }-->

        <!--// this.categories =-->
        <!--// console.log(this.selectedCategory, categories)-->

        <!--this.categoriesHistory.push(this.selectedCategory)-->
        <!--this.selectedCategoryInSearch = null-->

        <!--// this.selectedCategory = null-->

        <!--// console.log(this.selectedCategory.children)-->
        <!--// подгрузить детей для selectedCategory-->
      <!--}-->
    <!--}-->
  <!--},-->
  <!--methods: {-->
    <!--breadcrumbsCategoryClick (index) {-->
      <!--this.categoriesHistory = this.categoriesHistory.slice(0, index - this.breadcrumbsItemsStart.length + 1)-->
      <!--this.selectedCategory = this.categoriesHistory[this.categoriesHistory.length - 1]-->

      <!--console.log(this.selectedCategory)-->
    <!--}-->
  <!--}-->
<!--}-->
<!--</script>-->
