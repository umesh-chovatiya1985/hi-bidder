import type { NextPage } from 'next'
import { Footer } from '../Components/Layout/Footer/Footer'
import { Header } from '../Components/Layout/Header/Header'
import CategoryMenu from '../Components/Reusable/CategoryMenu'

const PageNotFound: NextPage = () => {
  const headerProps = {pageTitle: 'Hi Bidder Home page',pageDescription: 'hi Bidder Home Contents'};
  return (
    <div>
      <main>
        <Header headerProps={headerProps} headerTitle="Testing titles" anotherTitle="Another Titles"></Header>
        <CategoryMenu />
        <div>
            <h1>Opps! Page dont exist. Try after sometime</h1>
        </div>
      </main>
      <Footer></Footer>
    </div>
  )
}

export default PageNotFound
