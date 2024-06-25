import React from 'react'
import { Footer } from 'flowbite-react'
import { Link } from 'react-router-dom'
export default function FooterComp() {
  return (
    <Footer container className='animate__animated animate__fadeInUp animate__repeat-1 border border-t-8 border-teal-500'>
        <div>
            <div className=''>
                <div className=''>
                      <Link to="/" className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'>
                          <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>V</span>Blog
                      </Link>
                </div>
                <div className='grid grid-cols-2 gap-3 sm: mt-4 sm: grid-cols-3 sm: gap-6'>
                    <div>
                          <Footer.Title title='About' />
                          <Footer.LinkGroup col>
                              <Footer.Link href='https://github.com/' target='_blank' rel='noopener noreferrer'>
                                  Github
                              </Footer.Link>
                              <Footer.Link href='/about' target='_blank' rel='noopener noreferrer'>
                                  Varun's Blog
                              </Footer.Link>
                          </Footer.LinkGroup>
                    </div>
                    <div>
                          <Footer.Title title='Follow us' />
                          <Footer.LinkGroup col>
                              <Footer.Link href='https://github.com/' target='_blank' rel='noopener noreferrer'>
                                  Instagram
                              </Footer.Link>
                              <Footer.Link href='/' target='_blank' rel='noopener noreferrer'>
                                  LinkedIn
                              </Footer.Link>
                          </Footer.LinkGroup>
                    </div>
                </div>
            </div>
        </div>
    </Footer>
  )
}
